import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import entities from "../../../configuration/entities";
import roles from "../../../configuration/roles";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Practice } from "../../../types/interfaces/practices";
import { RoleType } from "../../../types/commons/commons";
import DashboardTable from "../../table/table";

type Practices = Practice[] | [];

const Dashboard = ({ match }: RouteComponentProps) => {
  const userRole: RoleType = "administrator";
  const [results, setResult] = useState<Practices>([]);

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
    fetch(`https://api.dryeyerescue.com/${get}`)
      .then((response) => response.json())
      .then((response) => setResult(response));
  }, [get]);

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
          <Button onClick={() => console.log("clicking")}>Add practice</Button>
        ) : null}
      </Flex>
      <DashboardTable
        columns={columns}
        results={results}
        permissions={currentEntityPermissions}
      />
    </Box>
  );
};

export default Dashboard;
