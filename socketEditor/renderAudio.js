import request from "request";
import xmlbuilder from "xmlbuilder";
import wav from "wav";
import { Readable } from "stream";
import saveAudio from "../video/saveAudio";

// TODO Handle this as ENV var? WG
const apiKey = "dbe1e8e3c5384d5b9015f951b0e40b8b";

// TODO Move to video helpers directory
// Add some sort of error checking and don't add any audio if this is the case
const azureAudio = ({ text }) =>
  new Promise((resolve, reject) => {
    const ssmlDoc = xmlbuilder
      .create("speak")
      .att("version", "1.0")
      .att("xml:lang", "en-us")
      .ele("voice")
      // .att('xml:lang', 'en-CA')
      // .att('xml:gender', 'Female')
      .att(
        "name",
        "Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)"
      )
      .ele("prosody")
      .att("rate", "-15.00%")
      .txt(text)
      .end();

    const postSpeakData = ssmlDoc.toString();

    request.post(
      {
        url: "https://api.cognitive.microsoft.com/sts/v1.0/issueToken",
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey
        }
      },
      (err, resp = {}, accessToken) => {
        if (err || resp.statusCode != 200) {
          // TODO handle using reject?
          console.log(err, resp.body);
          reject(err);
          return;
        } else {
          try {
            request.post(
              {
                url: "https://speech.platform.bing.com/synthesize",
                body: postSpeakData,
                headers: {
                  "content-type": "application/ssml+xml",
                  "X-Microsoft-OutputFormat": "riff-16khz-16bit-mono-pcm",
                  Authorization: `Bearer ${accessToken}`,
                  "X-Search-AppId": "07D3234E49CE426DAA29772419F436CA",
                  "X-Search-ClientID": "1ECFAE91408841A480F00935DC390960",
                  "User-Agent": "TTSNodeJS"
                },
                encoding: null
              },
              (err, resp, speakData) => {
                if (err || resp.statusCode != 200) {
                  console.log(err, resp.body);
                  reject(err);
                  return;
                } else {
                  try {
                    const reader = new wav.Reader();
                    reader.on("format", format => {
                      resolve({
                        data: speakData.slice(44, speakData.length - 16000),
                        format
                      });
                    });

                    const s = new Readable();
                    s.push(speakData);
                    s.push(null);
                    s.pipe(reader);
                  } catch (e) {
                    console.log(e.message);
                    reject(e);
                    return;
                  }
                }
              }
            );
          } catch (e) {
            console.log(e.message);
            reject(e);
            return;
          }
        }
      }
    );
  });

export default async ({ socket, action }) => {
  const { session, text = "", index = 0 } = action;

  if (session) {
    console.log("Audio at frame", index);

    const { data, format } = await azureAudio({ text });
    await saveAudio({
      session,
      index,
      data,
      format,
      root: process.env.RENDER_PATH
    });
  }
};
