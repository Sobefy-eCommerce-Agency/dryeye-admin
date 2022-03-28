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
  singleImage: boolean;
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
  singleImage,
}: FieldProps & ImageGalleryProps) => {
  const [gallery, setGallery] = useState<Gallery[] | []>([]);
  const gallerySize = singleImage ? 1 : 6;
  const galleryFull = gallery.length === gallerySize;
  const { setFieldValue } = form;
  const { value }: { value: string[] | undefined } = field;

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image: FileList | null = event?.target?.files;
    const currentImage = image && image.length === 1 ? image[0] : null;
    if (currentImage) {
      const galleryCopy = [...gallery];
      const base64Image = await toBase64(currentImage);
      const imageName = currentImage.name.split(".")[0];

      console.log(currentImage);

      galleryCopy.push({
        id: `${uuid()}_${imageName}`,
        image: currentImage,
        base64: base64Image,
        imageURL: "",
      });

      setFieldValue(fieldID, galleryCopy);
      setGallery(galleryCopy);
    }
  };

  const handleDeleteImage = (id: string) => {
    const filteredGallery = gallery.filter((image) => image.id !== id);
    setFieldValue(fieldID, filteredGallery);
    setGallery(filteredGallery);
  };

  useEffect(() => {
    if (value) {
      const galleryCopy = [...gallery];

      for (let index = 0; index < value.length; index++) {
        const key = value[index];
        const trimmedKey = key.split(".");
        const id = trimmedKey[0];
        const imageURL = `https://dryeyerescue-images.s3.amazonaws.com/${key}`;

        galleryCopy.push({ id, imageURL, base64: null, image: null });
      }

      setFieldValue(fieldID, galleryCopy);
      setGallery(galleryCopy);
    }
  }, []);

  return (
    <Box>
      <Grid templateColumns="1fr 1fr 1fr" gap={6} mb={8}>
        {gallery.map((current) => {
          const { id, image, imageURL } = current;
          const src = image ? URL.createObjectURL(image) : imageURL;

          return (
            <Box width="full" position="relative" key={id}>
              {src ? <img src={src} alt={id} /> : null}
              {image || imageURL ? (
                <Button
                  position="absolute"
                  bottom="10px"
                  right="10px"
                  onClick={() => handleDeleteImage(id)}
                  _hover={{
                    background: "red",
                    color: "white",
                  }}
                >
                  <DeleteIcon />
                </Button>
              ) : null}
            </Box>
          );
        })}
      </Grid>
      {galleryFull ? (
        <p>Maximum of images reached</p>
      ) : (
        <Input
          disabled={galleryFull}
          onChange={handleInputChange}
          type="file"
          accept="image/*"
        />
      )}
    </Box>
  );
};

export default ImageGallery;
