



import axios from 'axios';
import utils from '../data/utils.json';

export const getIconService = (iconName:string) => {
	
		return axios.get(`${utils.iconsApiSearch}${iconName}&limit=40`)
		.then(function(response){
			return response.data.icons;
		})
		.catch(function (err) {
			console.log(err)
		})
		.finally(function () {
		})

}

