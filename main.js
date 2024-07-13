const { automateMicrosoftReward } = require("./utils/autoMicrosoftReward");

const profiles = [1, 2, 3, 4, 5, 6, 7];

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
  console.log("All profiles completed.");
}).catch(err => {
  console.error("Error running profiles:", err);
});
