<ModalContent>
					<ModalCloseButton />
					<Flex
						w='100%'
						h='100%'
						mb='3%'
						px='6%'
						py='3%'
						wrap='nowrap'
						onClick={onOpen}
						justify='column'
					>
						{/* avatar box */}
						<Flex justify='center' align='center' w='15%' h='90%'>
							<Avatar size='xl' src={`//logo.clearbit.com/${review.domain}`} />
						</Flex>
						{/* content container */}
						<Flex w='100%' flexDir='column'>
							{/* tag container */}
							<Flex
								justify='flex-start'
								w='100%'
								h='32px'
								mt='0.5%'
								overflow='hidden'
							>
								{/* headline line container  */}
								<Flex w='100%' align='center' wrap='nowrap' pl='1%' mt='1%'>
									<h2>{review.company_name}</h2>
								</Flex>



								<Flex align='center' w='20%' wrap='nowrap'>
									<Flex as='h3' fontWeight='light' mr='10px' isTruncated>
										{review.job_rating}
									</Flex>
								</Flex>
								<Flex align='center' w='18%' wrap='nowrap'>
									<Box as={TiLocationOutline} mr='10px'></Box>
									<Flex as='h3' fontWeight='light' mr='10px' isTruncated>
										{review.job_location}
									</Flex>
								</Flex>
								<Flex align='center' w='18%' wrap='nowrap'>
									{review.offer_received ? (
										<>
											<Box as={TiThumbsUp} mr='10px'></Box>
											<Flex as='h3' fontWeight='light' mr='10px'>
												Received 0ffer
									</Flex>{' '}
										</>
									) : (
											<>
												{' '}
												<Box as={TiThumbsDown} mr='10px'></Box>
												<Flex as='h3' fontWeight='light' mr='10px'>
													No Offer
									</Flex>{' '}
											</>
										)}
								</Flex>
								<Flex align='center' w='40%' wrap='nowrap'>
									<Flex as='h3' fontWeight='light' mr='10px' isTruncated>
										Position: {review.job_title}
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					{/* Job review container */}
					<Flex
						w='100%'
						h='50%'
						wrap='nowrap'
						overflow='hidden'
						pl='1%'
						mt='0.5%'
					>
						<p>{review.job_review}</p>
					</Flex>
					{/* Overall Rating container */}
					<Flex
						w='100%'
						h='50%'
						wrap='nowrap'
						overflow='hidden'
						pl='1%'
						mt='0.5%'
					>
						<h2>Overall Rating</h2>
								5 Stars!
							</Flex>
					{/* Salary offered container */}
					<Flex
						w='100%'
						h='50%'
						wrap='nowrap'
						overflow='hidden'
						pl='1%'
						mt='0.5%'
					>
						<h2>Salary Offered</h2>
								${review.salary}
					</Flex>
					<ModalFooter>
						<Button variantColor="blue" mr={3} onClick={onClose}>Edit</Button>
						<Button variant="ghost">Delete</Button>
					</ModalFooter>
				</ModalContent>