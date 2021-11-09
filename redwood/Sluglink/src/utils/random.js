import firestore from "@react-native-firebase/firestore";

export function random_id() {
    // arbitrary collection -- not in actual use
    return firestore().collection("Arbitrary").doc().id;
}
