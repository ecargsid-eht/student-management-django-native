import axios from 'axios';
import { Box, Button, HStack, Modal, Row, Text, VStack } from 'native-base';
import React from 'react'
import { StyleSheet } from 'react-native';

const ViewModel = ({ setModal,student,setStudents }) => {

    const resetData = () => {
        axios.get("http://10.0.2.2:8000/").then((res) => {
      
            const data = res.data.sort((a, b) =>
                (a.academic_marks+a.sports_points) > (b.academic_marks+b.sports_points) ? -1 : 1,
            );
            setStudents(data)
            }).catch((err) => {
            console.log(err)
        })
    }
    const deleteStudent = (id) => {
        axios.delete(`http://10.0.2.2:8000/delete-student/${id}/`).then(() => {
            alert("Data deleted successfully.")
            resetData()
            setModal(false)
        }).catch((err) => console.log(err))
    }
    return (
        <>
            <Modal.Content minHeight={330} >
                <Modal.CloseButton  />
                <Modal.Header backgroundColor={'#01987a'}><Text fontSize={18} fontWeight={700} color='white'>Student Data</Text></Modal.Header>
                <Modal.Body>
                    <HStack mt={5} space={20} >
                        <VStack space={3}>
                                <Text style={styles.font}>Name</Text>
                                <Text style={styles.font}>Roll</Text>
                                <Text style={styles.font}>Academic Marks</Text>
                                <Text style={styles.font}>Sports Points</Text>
                                <Text style={styles.font}>Total</Text>
                        </VStack>
                        <VStack space={3}>
                                <Text style={[styles.font,styles.smallfont]}>{student.name}</Text>
                                <Text style={[styles.font,styles.smallfont]}>{student.id}</Text>
                                <Text style={[styles.font,styles.smallfont]}>{student.academic_marks}</Text>
                                <Text style={[styles.font,styles.smallfont]}>{student.sports_points}</Text>
                                <Text style={[styles.font,styles.smallfont]}>{student.sports_points + student.academic_marks}</Text>
                        </VStack>

                    </HStack>
                </Modal.Body>
                <Modal.Footer>   
                        <Button backgroundColor={'red.500'} size='lg' variant={'ghost'} onPress={() => {deleteStudent(student.id) }}>
                            <Text fontSize='16'  color='white'>Delete</Text>
                        </Button>
                  
                </Modal.Footer>
            </Modal.Content>
        </>
    )
}

export default ViewModel

const styles = StyleSheet.create({
    font:{
        fontSize:17,
        fontWeight:'500'
    },
    smallfont:{
        fontSize:15,
        color:'grey'
    }
})