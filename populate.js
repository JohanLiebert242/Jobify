//Libraries
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { readFile } from "fs/promises";

//Models
import Job from "./models/Jobs.js";
import User from "./models/User.js";

try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({ email: "johan@gmail.com" });
    const jsonJobs = JSON.parse(
        await readFile(new URL("./utils/mockData.json", import.meta.url))
    );

    const jobs = jsonJobs.map((job) => {
        return { ...job, createdBy: user._id };
    });
    await Job.deleteMany({ createdBy: user._id });
    await Job.create(jobs);
    console.log("Success!!!");
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}
