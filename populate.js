//Libraries
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { readFile } from "fs/promises";

//Models
import Job from "./models/Jobs.js";
import User from "./models/User.js";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const getEmail = () => {
    return new Promise((resolve) => {
        rl.question("Please enter the email: ", (email) => {
            rl.close();
            resolve(email.trim());
        });
    });
};

try {
    const email = await getEmail();

    console.log("email", email);

    if (!email) {
        throw new Error("Email cannot be empty");
    }

    await mongoose.connect(process.env.MONGO_URL);

    const user = await User.findOne({ email });
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
