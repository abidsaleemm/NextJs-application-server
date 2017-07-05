import { images } from './';

export default async ({ instanceUID }) => {
    const { [instanceUID]: image } = images;
    return image;
};