import { payloadRenders } from "../../actions";

export default ({ io, adapter = {} }) => {
  const { renders: { getRenderQueue = () => {} } = {} } = adapter;

  const intervalSeconds = 30;

  const intervalFunc = async () => {
    const renders = await getRenderQueue();

    io.emit("action", payloadRenders(renders));

    setTimeout(intervalFunc, intervalSeconds * 1000);
  };

  intervalFunc();
};
