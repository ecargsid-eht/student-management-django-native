import { Button, Input, Modal, Text } from 'native-base';
import React, { useState } from 'react'
import axios from 'axios'

const AddModel = ({ setModalVisible,setStudents }) => {
    const [name,setName] = useState("");
    const [academicMarks,setAcademicMarks] = useState(0);
    const [sportsPoint,setSportsPoint] = useState(0);


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

    const handleSave = () => {
        const form = new FormData()
        form.append("name",name)
        form.append("academic_marks",academicMarks)
        form.append("sports_points",sportsPoint)
        axios.post("http://10.0.2.2:8000/create-student/",{
            "name":name,
            "academic_marks":academicMarks,
            "sports_points":sportsPoint
        }).then((res) => {
            setModalVisible(false)
            alert("Student data submitted.")
            resetData()
        })
        .catch((err) => console.log(err))
    }
    return (
        <>
            <Modal.Content flex={.6} >
                <Modal.CloseButton colorScheme={'white'} />
                <Modal.Header backgroundColor={'#01987a'}><Text fontSize={18} fontWeight={700} color='white'>Add New Rank</Text></Modal.Header>
                <Modal.Body>
                <Input onChangeText={(text) => setName(text)} mt={3} size="lg" placeholder="Name" _light={{
                        placeholderTextColor: "blueGray.400"
                    }} _dark={{
                        placeholderTextColor: "blueGray.50"
                    }} />
                    <Input onChangeText={(text) => setAcademicMarks(text)} mt={4} keyboardType='number-pad' size="lg" placeholder="Enter Academic Marks" _light={{
                        placeholderTextColor: "blueGray.400"
                    }} _dark={{
                        placeholderTextColor: "blueGray.50"
                    }} />
                    <Input onChangeText={(text) => setSportsPoint(text)} mt={3} size="lg" keyboardType='number-pad' placeholder="Enter Sports Point" _light={{
                        placeholderTextColor: "blueGray.400"
                    }} _dark={{
                        placeholderTextColor: "blueGray.50"
                    }} />
                  
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisible(false);
                        }}>
                           <Text fontSize='16'>Cancel</Text>
                        </Button>
                        <Button backgroundColor={'#01987a'} variant='subtle' size='lg' onPress={() => {
                            setModalVisible(false);

                        }}>
                            <Text fontSize='16' color='white' onPress={() => handleSave()}>Save</Text>
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </>
    )
}

export default AddModel