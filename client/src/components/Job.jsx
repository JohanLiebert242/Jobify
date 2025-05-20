//Libraries
import { Link, Form } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

//Wrapper
import Wrapper from "../assets/wrappers/Job";

//Component
import { JobInfo } from "../components";

function Job({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    jobStatus,
}) {
    console.log("jobStatus", jobStatus);

    const date = day(createdAt).format("MMM Do, YYYY");
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div
                        style={{
                            backgroundColor:
                                jobStatus === "pending"
                                    ? "#fef3c7"
                                    : jobStatus === "interviewed"
                                    ? "#e0e8f9"
                                    : "#ffeeee",
                            color:
                                jobStatus === "pending"
                                    ? "#f59e0b"
                                    : jobStatus === "interviewed"
                                    ? "#647acb"
                                    : "#d66a6a",
                        }}
                        className={`status ${jobStatus}`}
                    >
                        {jobStatus}
                    </div>
                </div>

                <footer className="actions">
                    <Link className="btn edit-btn" to={`../edit-job/${_id}`}>
                        Edit
                    </Link>
                    <Form method="post" action={`../delete-job/${_id}`}>
                        <button className="btn delete-btn" type="submit">
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    );
}

export default Job;
