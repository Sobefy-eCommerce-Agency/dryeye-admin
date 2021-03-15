import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import styled from "@emotion/styled";
import { ActionType } from "../../types/commons/commons";
import { Entity } from "../../types/interfaces/entities";
import FieldForm from "./fieldForm";
import { PracticesSchema } from "../../configuration/validationSchemas";
import { buildEntityPayload } from "../utils/buildPayload";
import { AddressComponent, Practice } from "../../types/interfaces/practices";
import {
  GetInitialAddressComponents,
  GetInitialValues,
} from "../utils/initialValues";
interface FormProps {
  isOpen: boolean;
  onClose(): void;
  action: ActionType;
  entity: Entity;
  onSubmit(data: object): void;
  entityData: Practice | null;
}

const FormStyled = styled(Form)`
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 7.5rem);
  box-shadow: var(--chakra-shadows-lg);
  max-width: var(--chakra-sizes-4xl);
  display: flex;
  flex-direction: column;
`;

const ModalForm = ({
  isOpen,
  onClose,
  action,
  entity,
  onSubmit,
  entityData,
}: FormProps) => {
  const {
    id,
    fieldSet,
    fieldSetGroups,
    lang: { form },
  } = entity;

  const initialAddressComponents = GetInitialAddressComponents(
    id,
    action,
    entityData
  );

  const [
    addressComponent,
    setAddressComponent,
  ] = useState<AddressComponent | null>(initialAddressComponents);

  // Destruct lang
  const {
    createEntityTitle,
    createEntityButton,
    updateEntityTitle,
    updateEntityButton,
  } = form;

  // Configure lang
  const title = action === "create" ? createEntityTitle : updateEntityTitle("");
  const buttonLabel =
    action === "create" ? createEntityButton : updateEntityButton;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalOverlay>
        <ModalContent background="gray.50">
          <Formik
            initialValues={GetInitialValues(id, action, entityData)}
            onSubmit={(values: Practice | {}) => {
              const additionalData = addressComponent;
              if (additionalData) {
                const data = buildEntityPayload(
                  id,
                  action,
                  values,
                  additionalData
                );
                if (data) {
                  onSubmit(data);
                }
              }
            }}
            validationSchema={PracticesSchema(addressComponent)}
          >
            {(props) => (
              <FormStyled>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {fieldSetGroups.map((group) => (
                    <Box
                      key={group.id}
                      boxShadow="sm"
                      p="6"
                      rounded="md"
                      bg="white"
                      pb={8}
                      mb={4}
                    >
                      <Text fontSize={18} mb={3} fontWeight="semibold">
                        {group.label}
                      </Text>
                      <SimpleGrid columns={3} columnGap={6} rowGap={6}>
                        {fieldSet.map((fieldConfig) => {
                          const { group: fieldConfigGroup, id } = fieldConfig;
                          if (fieldConfigGroup === group.id) {
                            return (
                              <Field key={id} name={id}>
                                {({ field, form, meta }: FieldProps) => (
                                  <FieldForm
                                    fieldConfig={fieldConfig}
                                    form={form}
                                    field={field}
                                    meta={meta}
                                    setAddressComponent={setAddressComponent}
                                  />
                                )}
                              </Field>
                            );
                          }
                          return null;
                        })}
                      </SimpleGrid>
                    </Box>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} mr={3}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    background="brand.primary"
                    color="white"
                    mr={3}
                    _hover={{
                      background: "brand.primaryLight",
                    }}
                  >
                    {buttonLabel}
                  </Button>
                </ModalFooter>
              </FormStyled>
            )}
          </Formik>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
export default ModalForm;
