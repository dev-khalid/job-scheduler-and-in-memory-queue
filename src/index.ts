// import csv from "csv-parser";
// import fs, { open } from "node:fs";
// import path from "node:path";
// import mongoose from "mongoose";
// import "agenda";
// console.log("Starting server...");
// const URI = "mongodb+srv://khalid:khalid@cluster0.d2jzbha.mongodb.net/";
// mongoose
//   .connect(URI, {})
//   .then((d) => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("Failed to connect to MongoDB", err?.message);
//   });
// // let results: string[] = [];

// // fs.createReadStream(path.resolve("test.csv"))
// //   .pipe(
// //     csv({
// //       // separator: "\n",
// //       mapValues: ({ header, index, value }) => {
// //         return value.toUpperCase();
// //       },
// //       headers: false
// //     })
// //   )
// //   .on("data", (data) => results.push(data))
// //   .on("end", () => {
// //     console.log(results);
// //     // [
// //     //   { NAME: 'Daffy Duck', AGE: '24' },
// //     //   { NAME: 'Bugs Bunny', AGE: '22' }
// //     // ]
// //   });
