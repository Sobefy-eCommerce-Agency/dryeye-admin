import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Column } from "../../types/interfaces/entities";
import {
  ActionType,
  ColumnsKey,
  EntityDataType,
  SecondaryColumnKey,
} from "../../types/commons/commons";
import SkeletonRow from "../skeleton/SkeletonRow";

interface DashboardTableProps {
  columns: Column[];
  entityData: EntityDataType<any> | null;
  columnsKey: ColumnsKey;
  secondaryColumnKey: SecondaryColumnKey;
  permissions: any;
  onDelete(): void;
  setAction: React.Dispatch<React.SetStateAction<ActionType | null>>;
  onOpen(): void;
  setActiveData: React.Dispatch<
    React.SetStateAction<EntityDataType<any> | null>
  >;
}

const DashboardTable = ({
  columns,
  entityData,
  permissions,
  columnsKey,
  secondaryColumnKey = "",
  onDelete,
  setAction,
  onOpen,
  setActiveData,
}: DashboardTableProps) => {
  const {
    actions: { view, update, remove },
  } = permissions;

  const listHeaders = columns.map((column) => (
    <Th key={column.column}>{column.label}</Th>
  ));

  const listRows =
    entityData && entityData.length > 0
      ? entityData.map((result: EntityDataType<any>) => {
          const primaryKey = result[columnsKey];
          const secondaryKey = result[secondaryColumnKey];
          const key = `${primaryKey}-${secondaryKey}`;
          if (
            (typeof key === "string" || typeof key === "number") &&
            secondaryKey
          ) {
            return (
              <Tr key={key}>
                {columns.map((column) => {
                  const { column: columnKey, type: columnType } = column;
                  const columnContent = result[columnKey];

                  switch (columnType) {
                    case "image":
                      if (columnContent && columnContent.length > 0) {
                        const image = columnContent[0];
                        const imageURL = `https://dryeyerescue-images.s3.amazonaws.com/${image}`;
                        return (
                          <Td key={columnKey}>
                            <img width="70px" src={imageURL} />
                          </Td>
                        );
                      }
                      return (
                        <Td key={columnKey}>
                          <Box
                            width="70px"
                            height="70px"
                            background="brand.grey.light"
                          />
                        </Td>
                      );

                    default:
                      return <Td key={columnKey}>{columnContent}</Td>;
                  }
                })}
                <Td>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      aria-label="Actions"
                    >
                      Actions
                    </MenuButton>
                    <MenuList>
                      {view ? <MenuItem>View</MenuItem> : null}
                      {update ? (
                        <MenuItem
                          onClick={() => {
                            setAction("edit");
                            onOpen();
                            setActiveData(result);
                          }}
                        >
                          Edit
                        </MenuItem>
                      ) : null}
                      {remove ? (
                        <MenuItem
                          onClick={() => {
                            setActiveData(result);
                            onDelete();
                          }}
                        >
                          Delete
                        </MenuItem>
                      ) : null}
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          }
          return null;
        })
      : [...Array(20)].map((_, i) => (
          <Tr key={i}>
            {[...Array(columns.length + 1)].map((_, i) => (
              <Td key={i}>
                <SkeletonRow />
              </Td>
            ))}
          </Tr>
        ));

  return (
    <Flex flex={1} overflowY="auto" mb={8} borderWidth="1px">
      <Table
        variant="simple"
        width="full"
        fontWeight="normal"
        __css={{
          borderCollapse: "collapse",
          fontVariantNumeric: "lining-nums tabular-nums",
        }}
      >
        <Thead bg="gray.50">
          <Tr>
            {listHeaders}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{listRows}</Tbody>
      </Table>
    </Flex>
  );
};

export default DashboardTable;
