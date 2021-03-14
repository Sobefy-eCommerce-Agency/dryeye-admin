import { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import entities from "../../../configuration/entities";
import roles from "../../../configuration/roles";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  createStandaloneToast,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Practice } from "../../../types/interfaces/practices";
import { RoleType, ActionType } from "../../../types/commons/commons";
import DashboardTable from "../../table/table";
import ModalForm from "../../form/form";
import Api from "../../../configuration/axiosInstances";

type ActiveElement = {
  data?: object;
  name?: string;
};

const Dashboard = ({ match }: RouteComponentProps) => {
  const userRole: RoleType = "administrator";
  const [results, setResult] = useState<Practice[] | []>([]);
  const [action, setAction] = useState<ActionType>("idle");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const [activeElement, setActiveElement] = useState<ActiveElement>({});

  // Get entity configuration
  const filteredEntities = entities.filter(
    (entity) => entity.route === match.path
  );
  const currentEntity = filteredEntities[0];
  const {
    label,
    columns,
    data: { get },
  } = currentEntity;
  // Get entity permissions
  const filteredRoles = roles.filter((role) => role.role === userRole);
  const currentRole = filteredRoles[0];
  const { entities: roleEntities } = currentRole;
  const filteredEntityPermissions = roleEntities.filter(
    (entity) => entity.id === currentEntity.id
  );
  const currentEntityPermissions = filteredEntityPermissions[0];
  const {
    actions: { create, search },
  } = currentEntityPermissions;

  // Fetch context
  useEffect(() => {
    getPractices();
  }, []);

  // Fetch actions
  const getPractices = () => {
    Api.getPractices().then((response) => {
      const { data } = response;
      if (data) {
        setResult(data);
      }
    });
  };
  const createPractice = (data: object, name: string) => {
    Api.postPractice(data).then((response) => {
      const { data } = response;
      if (data) {
        const toast = createStandaloneToast();
        onClose();
        toast({
          title: "Practice created.",
          description: `The practice ${name} has been created.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        getPractices();
      }
    });
  };
  const deletePractice = (data: object, name: string) => {
    setActiveElement({ data, name });
    onOpenAlert();
  };

  const fetchDeletePractice = () => {
    const { data, name } = activeElement;
    if (data && name) {
      Api.deletePractice(data).then((response) => {
        const { data } = response;
        if (data) {
          const toast = createStandaloneToast();
          onClose();
          toast({
            title: "Practice deleted.",
            description: `The practice ${name} has been deleted.`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          getPractices();
        }
      });
    }
  };

  return (
    <Box m={10} fontWeight="semibold">
      <Text fontSize="3xl" mb={10}>
        {label}
      </Text>
      <Flex justifyContent="space-between" mb={8}>
        {search ? (
          <Flex w="sm">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input type="search" placeholder="Search for practices" />
            </InputGroup>
          </Flex>
        ) : null}
        {create ? (
          <Button
            onClick={() => {
              setAction("create");
              onOpen();
            }}
            background="brand.primary"
            color="white"
            _hover={{
              background: "brand.primaryLight",
            }}
          >
            Add practice
          </Button>
        ) : null}
      </Flex>
      <DashboardTable
        columns={columns}
        results={results}
        permissions={currentEntityPermissions}
        onDelete={(data, name) => deletePractice(data, name)}
      />
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        action={action}
        entity={currentEntity}
        onSubmit={(data, name) => createPractice(data, name)}
      />
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  fetchDeletePractice();
                  onCloseAlert();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Dashboard;
