import Header from "@/components/Header";
import React from "react";
import { StyleSheet } from "react-native";

const index = () => {
  //retrieve time for hello message
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "GOOD MORNING";
    } else if (hour < 18) {
      return "GOOD AFTERNOON";
    } else {
      return "GOOD EVENING";
    }
  }
  return (
    <>
      <Header
        headerInfo={{
          title: getGreeting(),

          //name to Kent for testing
          subtitle: "Kent",
          //intials to KD for testing
          initials: "KD",
        }}
      />
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
