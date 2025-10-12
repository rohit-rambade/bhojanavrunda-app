import { Formik } from "formik";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Role } from "./enums/Role";
import { LoginCredentials } from "./types/auth/login";

const initialLoginData: LoginCredentials = {
  UserName: "",
  Password: "",
  RoleId: Role.Customer,
};

const roles = [
  { id: Role.Customer, label: "Customer", value: Role.Customer },
  { id: Role.Tenant, label: "Tenant", value: Role.Tenant },
];
const Login = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Formik
          initialValues={initialLoginData}
          onSubmit={(values) => console.log("Submitted:", values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Enter Username"
                placeholderTextColor="#999"
                onChangeText={handleChange("UserName")}
                onBlur={handleBlur("UserName")}
                value={values.UserName}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#999"
                secureTextEntry
                onChangeText={handleChange("Password")}
                onBlur={handleBlur("Password")}
                value={values.Password}
              />
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.id}
                  style={styles.radioContainer}
                  onPress={() => setFieldValue("RoleId", role.value)}
                >
                  <View style={styles.radioCircle}>
                    {values.RoleId === role.value && (
                      <View style={styles.selectedDot} />
                    )}
                  </View>
                  <Text style={styles.label}>{role.label}</Text>
                </TouchableOpacity>
              ))}

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 40,
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    elevation: 1,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});
