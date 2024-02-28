"use strict";

import { faker } from "@faker-js/faker";
import fastq from "fastq";
import type { queueAsPromised } from "fastq";
import { mimicSendEmail } from "./mimicSendEmail";
import moment from "moment";

type SendEmail = {
  id: number;
  email: string;
};

const q: queueAsPromised<SendEmail> = fastq.promise(worker, 5);

async function worker(arg: SendEmail): Promise<string> {
  // No need for a try-catch block, fastq handles errors automatically
  return (await mimicSendEmail(arg.email)) as string;
}
let emails: string[] = [];
for (let i = 0; i < 10; i++) {
  emails.push(faker.internet.email());
}

emails.forEach(async (email, id) => {
  if (id == 0) {
    console.log("Starting : ", moment().format("mm:ss"));
  }
  // let r = await q.push({ id, email });
  // console.log(r);
  q.push({ id, email })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
    });

  if (id == emails.length - 1) {
    console.log("Ending : ", moment().format("mm:ss"));
  }
});
q.drained().then((d) => {
  console.log(`Queue Drained!`);
});
// setInterval(() => {
//   if (q?.length()) console.log(q.getQueue());
// }, 5000);
