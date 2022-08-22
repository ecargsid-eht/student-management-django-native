import React, { useState } from 'react'
import { DataTable } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Box, Button, Modal, Text } from 'native-base';
import ViewModel from './ViewModel';

const TableComponent = ({students,setStudents}) => {
    const [modal, setModal] = useState(false)
    const [stud,setStud] = useState({})
    const handlePress = (student) => {
        console.log(student)
        setStud(student)
        setModal(true)
    }
    return (
        <>
            <DataTable style={styles.container} >
                <Box backgroundColor={'#f3f3f3'}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title><Text fontSize={16.5} fontWeight={700} color='white'>Rank</Text></DataTable.Title>
                        <DataTable.Title><Text fontSize={16.5} fontWeight={700} color='white'>Name</Text></DataTable.Title>
                        <DataTable.Title><Text fontSize={16.5} fontWeight={700} color='white'>Action</Text></DataTable.Title>

                    </DataTable.Header>

                    {
                        students.map((student,key) => (
                            <DataTable.Row key={key}>
                                <DataTable.Cell><Text fontSize={14} fontWeight={700}>{key+1}</Text></DataTable.Cell>
                                <DataTable.Cell><Text fontSize={14} fontWeight={500}>{student.name}</Text></DataTable.Cell>
                                <DataTable.Cell>
                                    <Button onPress={() => handlePress(student)} size="sm" variant="subtle" backgroundColor={'green.200'}>
                                        <Text color={'gray.700'} > View </Text>
                                    </Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))
                    }
                    


                </Box>
            </DataTable>

            <Modal isOpen={modal} onClose={() => setModal(false)} size={'lg'}>
                <ViewModel setModal={setModal} student={stud} setStudents={setStudents} />
            </Modal>
        </>
    )
}

export default TableComponent



const styles = StyleSheet.create({
    container: {
        padding: 12,
    },

    tableHeader: {
        backgroundColor: '#01987a',
        color: 'white',
    },

})