const { automateMicrosoftReward } = require("./utils/autoMicrosoftReward");
const { caculateSum } = require("./utils/caculateSum");

const profiles = [4,5,6,7,8,9,10];

async function runProfiles() {
  for (let index = 0; index < profiles.length; index++) {
    await automateMicrosoftReward({
      headless: true,
      profile: profiles[index]
    });
    console.log(`Profile ${profiles[index]} completed.`);
  }
}
runProfiles().then(() => {
  caculateSum('./data/pointlog.txt')
}).catch(err => {
  console.error("Error running profiles:", err);
});
