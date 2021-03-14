import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Column } from "../../types/interfaces/entities";
import { Practice } from "../../types/interfaces/practices";

const DashboardTable = ({
  columns,
  entityData,
  permissions,
  onDelete,
}: {
  columns: Column[];
  entityData: Practice[] | [];
  permissions: any;
  onDelete(data: object, name: string): void;
}) => {
  const {
    actions: { view, update, remove },
  } = permissions;

  const listHeaders = columns.map((column) => (
    <Th key={column.column}>{column.label}</Th>
  ));

  const listRows =
    entityData.length > 0
      ? entityData.map((result: Practice) => (
          <Tr key={result.practice}>
            {columns.map((column) => {
              const columnKey = column.column;
              return <Td key={columnKey}>{result[columnKey]}</Td>;
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
                  {update ? <MenuItem>Edit</MenuItem> : null}
                  {remove ? (
                    <MenuItem
                      onClick={() =>
                        onDelete(
                          { practice: result.practice, doctor: result.doctor },
                          result.name
                        )
                      }
                    >
                      Delete
                    </MenuItem>
                  ) : null}
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))
      : null;

  return (
    <Table
      variant="simple"
      borderWidth="1px"
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
  );
};

export default DashboardTable;
