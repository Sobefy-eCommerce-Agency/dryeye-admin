import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const skeletonCard = () => {
  return (
    <Stack
      boxShadow="sm"
      p={5}
      cursor="pointer"
      background="white"
      mx={5}
      borderRadius={5}
      height="min-content"
    >
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default skeletonCard;
