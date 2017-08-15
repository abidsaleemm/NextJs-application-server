
import local from './local';
import azureAd from './azureAd';


export default server => {
	local (server);
	azureAd (server);
}
