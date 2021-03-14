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
import { buildPostPracticePayload } from "../utils/buildPayload";
import { AddressComponent } from "../../types/interfaces/practices";
interface FormProps {
  isOpen: boolean;
  onClose(): void;
  action: ActionType;
  entity: Entity;
  onSubmit(data: object, name: string): void;
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

const initialValues = {
  practice: "",
  doctor: "",
  name: "",
  phone: "",
  email: "",
  website: "",
  address: "",
  facebook_url: "",
  instagram_url: "",
  twitter_url: "",
  monday_op_hours: "",
  tuesday_op_hours: "",
  wednesday_op_hours: "",
  thursday_op_hours: "",
  friday_op_hours: "",
  saturday_op_hours: "",
  sunday_op_hours: "",
  street_number: "",
  route: "",
  county: "",
  state: "",
  state_short: "",
  city: "",
  country: "",
  country_short: "",
  zip: "",
  latitude: "",
  longitude: "",
  createdAt: -1,
};

const ModalForm = ({
  isOpen,
  onClose,
  action,
  entity,
  onSubmit,
}: FormProps) => {
  const [
    addressComponent,
    setAddressComponent,
  ] = useState<AddressComponent | null>(null);

  const title = action === "create" ? "Add" : "Edit";
  const { fieldSet, fieldSetGroups } = entity;

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
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              const additionalData = addressComponent;
              if (additionalData) {
                const data = buildPostPracticePayload(values, additionalData);
                if (data) {
                  onSubmit(data, data.name);
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
                    Save
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
