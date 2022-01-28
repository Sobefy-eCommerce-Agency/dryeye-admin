import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Grid, Input } from "@chakra-ui/react";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { toBase64 } from "../../../utils/utils";

interface Gallery {
  id: string;
  image: File | null;
  base64: string | ArrayBuffer | null;
  imageURL: string;
}

interface ImageGalleryProps {
  id: string;
}

const gallerySize = 6;
const galleryEmptyArray = Array(gallerySize);
const galleryArray: Gallery[] = [...galleryEmptyArray].map(() => {
  const id = uuid();
  return {
    id,
    image: null,
    base64: "",
    imageURL: "",
  };
});

function checkForCurrentImage(currImg: Gallery, id: string) {
  return currImg.id === id;
}

const cleanupGallery = (gallery: Gallery[]) => {
  const filteredGallery = gallery.filter(
    (image) =>
      (image.base64 !== null && image.base64 !== "") ||
      (image.imageURL !== "" && image.imageURL !== null)
  );
  const formattedGallery = filteredGallery.map((image) => {
    return {
      id: image.id,
      base64: image.base64,
      imageURL: image.imageURL,
    };
  });
  return formattedGallery;
};

const ImageGallery = ({
  id: fieldID,
  form,
  field,
}: FieldProps & ImageGalleryProps) => {
  const [gallery, setGallery] = useState<Gallery[] | []>(galleryArray);
  const { setFieldValue } = form;
  const { value }: { value: string[] | undefined } = field;

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const image: FileList | null = event?.target?.files;
    const currentImage = image && image.length === 1 ? image[0] : null;
    if (currentImage) {
      const currentImageIndex = gallery.findIndex((currentImg) =>
        checkForCurrentImage(currentImg, id)
      );
      const currentGalleryObject = [...gallery];
      const base64Image = await toBase64(currentImage);

      currentGalleryObject[currentImageIndex] = {
        id,
        image: currentImage,
        base64: base64Image,
        imageURL: "",
      };

      const filteredGallery = cleanupGallery(currentGalleryObject);
      setFieldValue(fieldID, filteredGallery);
      setGallery(currentGalleryObject);
    }
  };

  const handleDeleteImage = (id: string) => {
    const currentImageIndex = gallery.findIndex((currentImg) =>
      checkForCurrentImage(currentImg, id)
    );
    const currentGalleryObject = [...gallery];
    currentGalleryObject[currentImageIndex] = {
      id,
      image: null,
      base64: "",
      imageURL: "",
    };

    const filteredGallery = cleanupGallery(currentGalleryObject);
    setFieldValue(fieldID, filteredGallery);
    setGallery(currentGalleryObject);
  };

  useEffect(() => {
    if (value) {
      const imagesLength = value.length;
      // Remove X number of images from initial array
      const galleryCopy = [...gallery];
      galleryCopy.length = gallerySize - imagesLength;

      for (let index = 0; index < value.length; index++) {
        const key = value[index];
        const trimmedKey = key.split(".");
        const id = trimmedKey[0];
        const imageURL = `https://dryeyerescue-images.s3.amazonaws.com/${key}`;

        galleryCopy.push({ id, imageURL, base64: null, image: null });
      }

      const filteredGallery = cleanupGallery(galleryCopy);
      setFieldValue(fieldID, filteredGallery);
      setGallery(galleryCopy);
    }
  }, []);

  return (
    <Grid templateColumns="1fr 1fr 1fr" gap={6}>
      {gallery.map((current) => {
        const { id, image, imageURL } = current;
        const currentImage = gallery.filter((image) => image.id === id);
        const src =
          currentImage && currentImage.length === 1 && currentImage[0].image
            ? URL.createObjectURL(currentImage[0].image)
            : currentImage &&
              currentImage.length === 1 &&
              currentImage[0].imageURL
            ? currentImage[0].imageURL
            : "";

        return (
          <Box width="full" key={id}>
            {src ? <img src={src} /> : null}
            {!image && !imageURL ? (
              <Input
                onChange={(e) => handleInputChange(e, id)}
                width="full"
                type="file"
                accept="image/*"
              />
            ) : null}
            {image || imageURL ? (
              <Button onClick={() => handleDeleteImage(id)}>
                <DeleteIcon />
              </Button>
            ) : null}
          </Box>
        );
      })}
    </Grid>
  );
};

export default ImageGallery;
