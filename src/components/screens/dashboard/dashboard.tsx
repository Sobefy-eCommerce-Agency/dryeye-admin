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
import getEntityAPI from "../../../configuration/axiosInstances";

type ActiveElement = {
  data?: object;
  name?: string;
};

const Dashboard = ({ match }: RouteComponentProps) => {
  const userRole: RoleType = "administrator";
  const [entityData, setEntityData] = useState<Practice[] | null>(null);
  const [action, setAction] = useState<ActionType>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const [activeElement, setActiveElement] = useState<ActiveElement>({});
  const [activeData, setActiveData] = useState<Practice | null>(null);

  // Get entity configuration
  const filteredEntities = entities.filter(
    (entity) => entity.route === match.path
  );
  const currentEntity = filteredEntities[0];
  const { columns, id, lang } = currentEntity;

  // Get entity lang
  const {
    dashboard: { title, searchBar, addEntityButton },
    userFeedback: {
      entityCreatedTitle,
      entityCreatedDescription,
      entityUpdatedTitle,
      entityUpdatedDescription,
      entityDeletedTitle,
      entityDeletedDescription,
    },
    dialogs: { deleteEntityTitle, deleteEntityDescription },
  } = lang;

  // Get entity permissions
  const filteredRoles = roles.filter((role) => role.role === userRole);
  const currentRole = filteredRoles[0];
  const { entities: roleEntities } = currentRole;
  const filteredEntityPermissions = roleEntities.filter(
    (entity) => entity.id === id
  );
  const currentEntityPermissions = filteredEntityPermissions[0];
  const {
    actions: { create, search },
  } = currentEntityPermissions;

  // Entity API
  const EntityAPI = getEntityAPI(id);

  // Fetch context
  useEffect(() => {
    getEntityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch actions
  const getEntityData = () => {
    EntityAPI?.get().then((response) => {
      const { data } = response;
      if (data) {
        setEntityData(data);
      }
    });
  };

  const createEntity = (data: object) => {
    EntityAPI?.create(data).then((response) => {
      const { data } = response;
      if (data) {
        const toast = createStandaloneToast();
        const name = data.name;
        onClose();
        toast({
          title: entityCreatedTitle,
          description: entityCreatedDescription(name),
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        getEntityData();
      }
    });
  };

  const updateEntity = (requestData: any) => {
    EntityAPI?.update(requestData).then((response) => {
      const { data } = response;
      if (data) {
        const toast = createStandaloneToast();
        const name = requestData.name || "";
        onClose();
        toast({
          title: entityUpdatedTitle,
          description: entityUpdatedDescription(name),
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        getEntityData();
      }
    });
  };

  const deleteEntityMessage = (data: object, name: string) => {
    setActiveElement({ data, name });
    onOpenAlert();
  };

  const deleteEntity = () => {
    const { data, name } = activeElement;
    if (data && name) {
      EntityAPI?.delete(data).then((response) => {
        const { data } = response;
        if (data) {
          const toast = createStandaloneToast();
          onClose();
          toast({
            title: entityDeletedTitle,
            description: entityDeletedDescription(name),
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          getEntityData();
        }
      });
    }
  };

  const handleSubmit = (data: object) => {
    if (action === "create") {
      createEntity(data);
    }
    updateEntity(data);
  };

  return (
    <Box m={10} fontWeight="semibold">
      <Text fontSize="3xl" mb={10}>
        {title}
      </Text>
      <Flex justifyContent="space-between" mb={8}>
        {search ? (
          <Flex w="sm">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input type="search" placeholder={searchBar} />
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
            {addEntityButton}
          </Button>
        ) : null}
      </Flex>
      <DashboardTable
        columns={columns}
        entityData={entityData}
        permissions={currentEntityPermissions}
        onDelete={(data, name) => deleteEntityMessage(data, name)}
        setAction={setAction}
        setActiveData={setActiveData}
        onOpen={onOpen}
      />
      {isOpen ? (
        <ModalForm
          isOpen={isOpen}
          onClose={onClose}
          action={action}
          entity={currentEntity}
          onSubmit={(data) => handleSubmit(data)}
          entityData={activeData}
        />
      ) : null}

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {deleteEntityTitle}
            </AlertDialogHeader>
            <AlertDialogBody>{deleteEntityDescription}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteEntity();
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
