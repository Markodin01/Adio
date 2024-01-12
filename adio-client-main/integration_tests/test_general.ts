import { Selector } from 'testcafe';
import XPathSelector from './tools/XPathSelector';


async function testLogin(t: TestController) {
  const loginAsGuest = XPathSelector('/html/body/ngb-modal-window/div/div/div/div/div[3]/a/button/span[5]')
  const typeName = XPathSelector('/html/body/div/div[2]/div/mat-dialog-container/div/div/app-choose-user-name/div/form/div/mat-form-field/div[1]/div/div[2]/input')
  const submitButton = XPathSelector('/html/body/div/div[2]/div/mat-dialog-container/div/div/app-choose-user-name/div/form/div/button')
  const createButton = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-playcreate/div/div[1]/div/button/span[2]').exists
  await t
      .click(loginAsGuest)
      .typeText(typeName, 'testName')
      .click(submitButton)
      .expect(createButton).ok()
  console.log("Passed: testLogin")
}

async function testGameRoomCreation(t: TestController) {
  const createButton = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-playcreate/div/div[1]/div/button/span[2]')
  const roomName = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-gamecreate/div/div[1]/div/input')
  const gameType = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-gamecreate/div/div[2]/div/button')
  const guessSong = XPathSelector('/html/body/div/div[2]/div/mat-dialog-container/div/div/app-gametype/div/div[1]/div/button')
  const numberRounds = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-gamecreate/div/div[3]/div/button')
  const oneRound = XPathSelector('/html/body/div/div[2]/div/mat-dialog-container/div/div/app-numberpicker/div/div[1]/div/button/span[2]')
  const roundDuration = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-gamecreate/div/div[4]/div/button')
  const sevenSeconds = XPathSelector('/html/body/div/div[2]/div/mat-dialog-container/div/div/app-numberpicker/div/div[7]/div/button/span[2]')
  const playlists = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-gamecreate/div/div[6]/div/button')
  const firstPlaylist = XPathSelector('/html/body/div/div[2]/div/mat-dialog-container/div/div/app-playlists/div/div/div[1]')
  const createGameRoom = XPathSelector('/html/body/app-root/app-home/body/div[3]/app-main-frame/div/div/app-gamecreate/div/div[7]/div/a')
  const startButton = XPathSelector('/html/body/div/div[2]/div/mat-dialog-container/div/div/app-gameready/div/div[4]/div/button/span[2]').exists
  
  await t
    .click(createButton)
    .typeText(roomName, 'sample name')
    .click(gameType)
    .click(guessSong)
    .click(numberRounds)
    .click(oneRound)
    .click(roundDuration)
    .click(sevenSeconds)
    .click(playlists)
    .wait(2000)
    .click(firstPlaylist)
    .wait(2000)
    .click(createGameRoom)
    .expect(startButton).ok()
}


fixture('Example Test Fixture')
  .page('adio-client.s3-website.eu-west-2.amazonaws.com');

test('test app usage', async t => {
    await testLogin(t)
    await testGameRoomCreation(t)
}).timeouts({
  pageLoadTimeout: 10000,
  pageRequestTimeout: 20000,
  ajaxRequestTimeout: 20000,
});



