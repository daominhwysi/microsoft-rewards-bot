const { automateMicrosoftReward } = require("./utils/autoMicrosoftReward");
const { caculateSum } = require("./utils/caculateSum");

const profiles = [5];

async function runProfiles() {
  for (let index = 0; index < profiles.length; index++) {
    await automateMicrosoftReward({
      headless: false,
      profile: profiles[index]
    });
    console.log(`Profile ${profiles[index]} completed.`);
  }
}
runProfiles().then(() => {
 
}).catch(err => {
  console.error("Error running profiles:", err);
});
