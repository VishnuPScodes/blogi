import { useState } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <IconButton
        icon={<HiMenu />}
        aria-label="Open Sidebar"
        onClick={toggleSidebar}
      />
      <Drawer isOpen={isOpen} onClose={toggleSidebar} placement="left">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch">
               
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default LeftSidebar;
