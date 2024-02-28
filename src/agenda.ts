import Agenda, { Job, JobAttributesData, JobPriority } from "agenda";
import { mimicSendEmail } from "./mimicSendEmail";
import { faker } from "@faker-js/faker";

const URI = "mongodb+srv://khalid:khalid@cluster0.d2jzbha.mongodb.net/";
const agenda = new Agenda({ db: { address: URI } });
interface ISendEmail extends JobAttributesData {
  email: string;
}
agenda.define<ISendEmail>(
  "SEND-EMAIL",
  { concurrency: 5, shouldSaveResult: true, lockLimit: 5 },
  async (job: Job<ISendEmail>) => {
    const emailAddress = job?.attrs?.data?.email; // type Contact
    let result = await mimicSendEmail(emailAddress);
    console.log(result);
    return result;
  }
);
(async () => {
  try {
    await agenda.start();
    console.log("Agenda started");
  } catch (error) {
    console.log("error");
  }
})();

agenda.on("start", (job) => {
  console.log("Job %s starting", job.attrs.name, new Date());
});

// agenda.on("complete", (job) => {
//   console.log(`Job ${job.attrs.name} finished`);
// });

agenda.on("success:SEND-EMAIL", (job: Job<ISendEmail>) => {
  // console.log(`Sent Email Successfully to ${job.attrs.data.email}`);
});
agenda.on("fail:send email", (err, job) => {
  console.log(`Job failed with error: ${err.message}`);
});

let emails: string[] = [];
for (let i = 0; i < 10; i++) {
  emails.push(faker.internet.email());
}
setTimeout(() => {
  emails.forEach(async (email) => {
    agenda.now("SEND-EMAIL", { email: email });
  });
}, 2000);
