import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

const Task = (props) => {
    const [completed, setCompleted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(props.text);

    const completeTask = () => {
        setCompleted(!completed);
        console.log('Task status toggled:', props.text);
    };

    const onEdit = () => {
        props.onEdit && props.onEdit();
    };

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity
                    style={[
                        styles.square,
                        completed && styles.squareCompleted
                    ]}
                    onPress={completeTask}
                />
                <Text
                    style={[
                        styles.itemText,
                        completed && styles.itemTextCompleted
                    ]}
                >
                    {props.text}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.btnEdit}
                onPress={onEdit}
            >
                <Text style={styles.btnEditText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#BDBDBD",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    squareCompleted: {
        backgroundColor: "#55BCF6",
        opacity: 1,
    },
    itemText: {
        maxWidth: "80%",
        color: "#333",
        fontSize: 16,
    },
    itemTextCompleted: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    btnEdit: {
        backgroundColor: '#1194e0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnEditText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Task;
