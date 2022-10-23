import FSQ_Photo from "../types/FSQ_Photo";

/**
 * Compute the full url for a photo data
 * @param photo Photo data 
 * @returns Url of the photo
 */
const getPhotoUrl = ({ prefix, suffix }: FSQ_Photo) => {
  return `${prefix}original${suffix}`;
}

export default getPhotoUrl;