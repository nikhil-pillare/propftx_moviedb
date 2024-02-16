import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Button, Heading, Card, Flex, CardHeader, CardBody, CardFooter, Image, Stack, Text, Divider, ButtonGroup, Select, Input } from '@chakra-ui/react';
import { fetchMovie } from '../redux/movies/action';
import { FaStar } from 'react-icons/fa';


function Movies() {
    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])
    const [wishlist, setWishlist] = useState([]);
    const [lastAddedMovie, setLastAddedMovie] = useState(null);
    async function fetchdata() {
        try {
            const response = await axios.get('https://backendmoviedb.onrender.com/movies');



            setMovies(response.data[0].movies)
            setShows(response.data[0].shows)
        } catch (error) {
            console.log("error", error)
        }
    }



    console.log("datahere", movies)
    console.log(shows)
    useEffect(() => {
        fetchdata()
    }, []);


    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 10; i++) {
            stars.push(
                <FaStar
                    key={i}
                    color={i < Math.floor(rating) ? "orange" : "gray.300"}
                />
            );
        }
        return stars;
    };
    const addToWishlist = (movie) => {
        
        if (!wishlist.includes(movie.id)) {
          setWishlist([...wishlist, movie.id]);
          setLastAddedMovie(movie);
        } else {
          setLastAddedMovie(null);
        }
      };
    return (
        <Box>
            <Heading style={{ margin: "auto", color: "white", textAlign: "center", fontFamily: "monospace", }}>MovieDB</Heading>
            <Input style={{ width: "60%", backgroundColor: "ButtonFace", marginLeft: "20%" }} placeholder='search your movie...' />
            <Stack spacing={4} direction="row" flexWrap="wrap" justify="space-around" mt={8}>
                {movies.map((movie) => (
                    <Card key={movie.id} maxW='sm' boxShadow="md" rounded="md"  >
                        <Image
                            src={movie.poster}
                            alt={movie.title}
                            roundedTop="md"
                            onError={(e) => {
                                e.target.src = 'https://m.media-amazon.com/images/M/MV5BOTFiNDhiYWQtYzk1MC00NzRkLWFiZmQtNzNkMWQzY2Y2Yjk1XkEyXkFqcGdeQXVyMTQxNjU5MDQ2._V1_FMjpg_UX1000_.jpg';
                            }}
                        />
                        <Box p={4}>
                            <Heading fontSize="lg" fontWeight="bold" mb={2}>
                                {movie.title}
                            </Heading>
                            <Text color="gray.500" fontSize="sm">
                                {movie.year}
                            </Text>
                            <Text color="gray.500" fontSize="sm">
                                Genre: {movie.genre}
                            </Text>
                            <Flex align="center">
                                {renderStars(movie.rating)}
                                <Text ml={2}>{movie.rating}</Text>
                            </Flex>
                            <Divider my={2} />
                            <Text fontSize="sm">
                                {movie.plot}
                            </Text>
                            <Button
                                colorScheme="teal"
                                mt={4}
                                onClick={() => addToWishlist(movie)}
                            >
                                Add to Wishlist
                            </Button>
                            <Text mt={2} color={lastAddedMovie === movie ? 'green' : 'orange'}>
                {lastAddedMovie === movie && lastAddedMovie !== null ? `Added "${movie.title}" to Wishlist` : ''}
              </Text>
                        </Box>
                    </Card>
                ))}
            </Stack>
        </Box>
    )
}


export default Movies;