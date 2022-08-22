import { Box, Button, Fab, Icon, Modal, NativeBaseProvider, Pressable, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import TableComponent from './Components/TableComponent'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddModel from './Components/AddModel';
import axios from 'axios';
const App = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [students,setStudents] = useState([])
  
  useEffect(() => {
    axios.get("http://10.0.2.2:8000/").then((res) => {
      
      const data = res.data.sort((a, b) =>
        (a.academic_marks+a.sports_points) > (b.academic_marks+b.sports_points) ? -1 : 1,
      );
      console.log(data)
      setStudents(data)
    }).catch((err) => {
      console.log(err)
    })
    
  },[])

  const handleModal = () => { 
    setModalVisible(true)
  }
  return (
    <>
      <NativeBaseProvider>
        <Box style={{ flex: 1, backgroundColor: 'white' }}>
          <TableComponent students={students} setStudents={setStudents} />
         
          <Fab
            renderInPortal={false}
            shadow={3}
            size="lg"
            backgroundColor={'#01987a'}
            icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />}
            onPress={() =>  handleModal()}
          />
        </Box>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible()} size={'full'}>
          <AddModel setModalVisible={setModalVisible} setStudents={setStudents} />
        </Modal>
      </NativeBaseProvider>

    </>
  )
}

export default App