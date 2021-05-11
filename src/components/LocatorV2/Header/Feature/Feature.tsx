import { Box, Text } from "@chakra-ui/react";

interface FeatureProps {
  title: string;
  svg: React.ReactNode;
}

const Feature = ({ title, svg }: FeatureProps) => {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      ml={8}
    >
      <Box height="90px" mb={2}>
        {svg}
      </Box>
      <Text color="white">{title}</Text>
    </Box>
  );
};

export default Feature;
