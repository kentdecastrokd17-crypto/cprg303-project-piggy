import Header from "@/components/Header";
import React from "react";
import { StyleSheet } from "react-native";

const index = () => {
  return (
    <>
      <Header
        headerInfo={{
          title: "MANAGER",

          subtitle: "Account",
          //intials to KD for testing
          initials: "KD",
        }}
      />
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
