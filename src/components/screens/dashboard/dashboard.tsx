import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  RoleType,
  ActionType,
  EntityType,
  EntityDataType,
} from "../../../types/commons/commons";
import DashboardTable from "../../table/table";
import ModalForm from "../../form/form";
import { getEntityAPI } from "../../../configuration/axiosInstances";
import { buildEntityPayload } from "../../../utils/buildPayload";
import { SearchByEntity } from "../../../utils/format";
import AppContainer from "../../container/appContainer";
import Sidebar from "../../sidebar/sidebar";

type DashboardProps = {
  entityName: EntityType;
};

const Dashboard = ({ entityName }: DashboardProps) => {
  const cancelTokenSource = axios.CancelToken.source();
  const userRole: RoleType = "administrator";
  const [entityData, setEntityData] = useState<EntityDataType<any>[] | null>(
    null
  );
  const [filteredData, setFilteredData] = useState<
    EntityDataType<any>[] | null
  >(null);
  const [action, setAction] = useState<ActionType>(null);
  const [searchterm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const [activeData, setActiveData] = useState<EntityDataType<any> | null>(
    null
  );
  const toast = useToast();

  // Get entity configuration
  const filteredEntities = entities.filter(
    (entity) => entity.id === entityName
  );
  const currentEntity = filteredEntities[0];
  const { columns, columnsKey, secondaryColumnKey, lang } = currentEntity;

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
    (entity) => entity.id === entityName
  );
  const currentEntityPermissions = filteredEntityPermissions[0];
  const {
    actions: { create, search },
  } = currentEntityPermissions;

  // Entity API
  const EntityAPI = getEntityAPI(entityName);

  // Fetch context
  useEffect(() => {
    setEntityData(null);
    setSearchTerm("");
    setFilteredData([]);
    getEntityData();
    return () => {
      cancelTokenSource.cancel(
        `The component attached to the entity ${entityName} was unmounted.`
      );
    };
  }, [entityName]);

  // Fetch actions
  const getEntityData = () => {
    EntityAPI.get(cancelTokenSource.token).then((response) => {
      const { data } = response;
      if (data) {
        setEntityData(data);
      }
    });
  };

  const createEntity = (data: object) => {
    EntityAPI.create(data).then((response) => {
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
        setEntityData(null);
        getEntityData();
        setFilteredData(null);
        setSearchTerm("");
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
        setEntityData(null);
        getEntityData();
        setFilteredData(null);
        setSearchTerm("");
      }
    });
  };

  const deleteEntity = () => {
    if (activeData) {
      const payload = buildEntityPayload(
        entityName,
        "delete",
        activeData,
        null
      );
      if (payload) {
        EntityAPI?.delete(payload).then((response) => {
          const { data } = response;
          if (data) {
            const toast = createStandaloneToast();
            onClose();
            toast({
              title: entityDeletedTitle,
              description: entityDeletedDescription(data.name),
              status: "success",
              duration: 4000,
              isClosable: true,
            });
            setEntityData(null);
            getEntityData();
            setFilteredData(null);
            setSearchTerm("");
          }
        });
      }
    }
  };

  // Event Handlers
  const handleSubmit = (data: object) => {
    if (action === "create") {
      createEntity(data);
    }
    updateEntity(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    // filter by entity
    if (term) {
      const results = SearchByEntity(entityName, entityData, term);
      if (results.length > 0) {
        setFilteredData(results);
        return;
      }
      setFilteredData([]);
      return;
    }
  };

  const handleDeployPractices = async () => {
    const deployHookResult = await fetch(
      "https://api.vercel.com/v1/integrations/deploy/prj_ZgBhHwhXaZ7Ky7Y7J8iUldL3Pdww/mTYuWyCjXs?buildCache=false"
    );
    const deployHook = await deployHookResult.json();
    console.log(deployHook);
    if (deployHook?.job) {
      const { id, state } = deployHook.job;
      if (state === "PENDING") {
        toast({
          title: "Deployment created.",
          description: `We've created the deployment with id: ${id}. Please note that this process can take up to 5 minutes to complete.`,
          status: "success",
          duration: 20000,
          isClosable: true,
        });
      }
    }
  };

  // Results label
  const totalDataLenght = entityData ? entityData.length : 0;
  const totalDataFileteredLength = filteredData ? filteredData.length : 0;
  const resultsLabel = searchterm
    ? `${totalDataFileteredLength} results for: "${searchterm}"`
    : `${totalDataLenght} ${title.toLowerCase()}`;

  return (
    <AppContainer>
      <Sidebar />
      <Box
        p={10}
        fontWeight="semibold"
        display="flex"
        flexDirection="column"
        maxHeight="100vh"
      >
        <Text fontSize="3xl" mb={10} flex={0}>
          {title}
        </Text>
        <Flex justifyContent="space-between" mb={8} flex={0}>
          {search ? (
            <Flex w="sm">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="search"
                  placeholder={searchBar}
                  value={searchterm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Flex>
          ) : null}
          <Box>
            <Button
              onClick={handleDeployPractices}
              background="brand.secondary"
              color="white"
              mr={4}
              _hover={{
                background: "brand.secondaryColor.dark",
              }}
            >
              Publish Practices
            </Button>
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
          </Box>
        </Flex>
        <DashboardTable
          columns={columns}
          columnsKey={columnsKey}
          secondaryColumnKey={secondaryColumnKey}
          entityData={filteredData && searchterm ? filteredData : entityData}
          permissions={currentEntityPermissions}
          onDelete={() => onOpenAlert()}
          setAction={setAction}
          setActiveData={setActiveData}
          onOpen={onOpen}
        />
        <Box flex={0}>
          <Text>{resultsLabel}</Text>
        </Box>
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
    </AppContainer>
  );
};

export default Dashboard;
