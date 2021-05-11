import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const SkeletonCard = () => {
  return (
    <Stack
      boxShadow="sm"
      p={5}
      cursor="pointer"
      background="white"
      borderRadius={5}
      height="min-content"
    >
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default SkeletonCard;
