import Job from "../models/Jobs.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query;

    const queryObject =
        req.user.role === "admin"
            ? {}
            : {
                  createdBy: req.user.userId,
              };

    if (search) {
        queryObject.$or = [
            {
                position: { $regex: search, $options: "i" },
            },
            {
                company: { $regex: search, $options: "i" },
            },
        ];
    }

    if (jobStatus && jobStatus !== "all") {
        queryObject.jobStatus = jobStatus;
    }

    if (jobType && jobType !== "all") {
        queryObject.jobType = jobType;
    }

    const sortOptions = {
        newest: "-createdAt",
        oldest: "createdAt",
        "a-z": "position",
        "z-a": "-position",
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    //Set up pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    //Explanation: In the first page, we skip 0 -> 10 jobs
    // Second page, skip 10 -> skip 10 jobs in the first page
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
        .sort(sortKey)
        .skip(skip)
        .limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    return res
        .status(StatusCodes.OK)
        .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const getSingleJob = async (req, res) => {
    const job = await Job.findById(req.params.id);

    return res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);

    return res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    return res.status(StatusCodes.OK).json({ jobs: updatedJob });
};

export const deleteJob = async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);

    return res.status(StatusCodes.OK).json({ msg: "Job deleted" });
};

export const showStats = async (req, res) => {
    //
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: status, count } = curr;
        acc[status] = count;
        return acc;
    }, {});

    let monthlyApplications = await Job.aggregate([
        {
            $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                "_id.year": -1,
                "_id.month": -1,
            },
        },
        {
            $limit: 6,
        },
    ]);

    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            //$month in MongoDB starts from 1 to 12
            //dayjs month starts from 0 to 11
            const date = day()
                .month(month - 1)
                .year(year)
                .format("MMM YY");

            return { date, count };
        })
        .reverse();

    const defaultStats = {
        pending: stats.pending || 0,
        interviewed: stats.interviewed || 0,
        rejected: stats.rejected || 0,
    };

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
