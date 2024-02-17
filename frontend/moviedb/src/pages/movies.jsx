import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Card, Image, Stack, Text, Input, Flex, Button, Divider } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import Nav from '../component/Nav';
function Movies() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [lastAddedMovie, setLastAddedMovie] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('Movies');
  const [showWishlist, setShowWishlist] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = (currentCategory === 'Movies' ? movies : shows).filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  async function fetchdata() {
    try {
      const response = await axios.get('https://backendmoviedb.onrender.com/movies');

      setMovies(response.data[0].movies);
      setShows(response.data[0].shows);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i < Math.floor(rating) ? "orange" : "gray.500"}
        />
      );
    }
    return stars;
  };

  const addToWishlist = (item) => {
    if (!wishlist.includes(item.id)) {
      setWishlist([...wishlist, item.id]);
      setLastAddedMovie(item);
    } else {
      setLastAddedMovie(null);
    }
  };
  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box >
      <Nav />

      <Input style={{ width: "60%", backgroundColor: "ButtonFace", marginLeft: "20%", marginTop: "70px" }} value={searchTerm} onChange={handleSearch} placeholder='search your movie...' />
      <Flex width={"100%"} justifyContent={"space-around"} alignContent={"center"} mt={4}>
        <Button
          colorScheme={currentCategory === 'Movies' ? 'teal' : 'gray'}
          onClick={() => setCurrentCategory('Movies')}
          mr={2}
        >
          Movies
        </Button>
        <Button
          colorScheme={currentCategory === 'Shows' ? 'teal' : 'gray'}
          onClick={() => setCurrentCategory('Shows')}
        >
          Shows
        </Button>

        <Flex direction='column' align='center'>
          <Button onClick={toggleWishlist}>
            {showWishlist ? 'Hide Wishlist' : 'Show Wishlist'}
          </Button>
          {showWishlist && (
            <Box mt={4} bg="rgba(255, 255, 255, 0.8)" p={"10px"} rounded="md">
              <Heading as="h2" size="md" color="black">
                Wishlist:
              </Heading>
              <ul>
                {wishlist.map((itemId) => (
                  <li key={itemId}>{itemId}</li>
                ))}
              </ul>
            </Box>
          )}
        </Flex>
      </Flex>

      <Stack spacing={4} direction="row" flexWrap="wrap" justify="space-around" mt={8}>
        {filteredItems.map((item) => (
          <Card key={item.id} width={"30vw"} maxW='sm' height={"70vh"} boxShadow="md" rounded="md">
            <Image
              src={item.poster}
              alt={item.title}
              height={"50%"}
              aspectRatio={"3:5"}
              roundedTop="md"
              onError={(e) => {
                e.target.src = 'https://m.media-amazon.com/images/I/61CHaKs2i1L._AC_UF1000,1000_QL80_.jpg';
              }}
            />
            <Box p={4}>
              <Heading fontSize="md" fontWeight="bold" mb={2}>
                {item.title}
              </Heading>
              <Text color="gray.500" fontSize="sm">
                {item.year}
              </Text>
              <Flex align="center">
                {renderStars(item.rating)}
                <Text ml={2}>{item.rating}</Text>
              </Flex>
              <Text color="gray.500" fontSize="sm">
                Genre: {item.genre}
              </Text>
              <Divider my={2} />



               
              <div style={{height:"50px", overflowY: 'auto',}}>
                <p>
                 <span style={{fontWeight:"bolder"}}>Movie plot:</span> {item.plot}
                </p>

              </div>


              <Flex justifyContent={"space-around"}>
              <Button
                colorScheme="teal"
                mt={4}
                width={"40%"}
                onClick={() => addToWishlist(item)}
              >
                Add to Wishlist
              </Button>
              <Text width={"60%"} mt={2}  color={lastAddedMovie === item ? 'green' : 'orange'}>
                {lastAddedMovie === item && lastAddedMovie !== null ? `Added "${item.title}" to Wishlist` : ''}
              </Text>
              </Flex>
             
            </Box>
          </Card>
        ))}
      </Stack>

    </Box>
  );
}

export default Movies;
