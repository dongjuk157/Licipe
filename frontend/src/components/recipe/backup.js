// const useInfiniteScroll = ({
// 	root = null,
// 	target,
// 	onIntersect,
// 	threshold = 1.0,
// 	rootMargin = '0px',
// }) => {
// 	useEffect(() => {
// 		let observer;
// 		if (target) {
// 			observer = new IntersectionObserver(onIntersect, {
// 				root,
// 				rootMargin,
// 				threshold,
// 			});
// 			observer.observe(target);		
// 		}
// 		return () => observer && observer.disconnect();
// 	}, [target, root, rootMargin, onIntersect, threshold]);
// }

// // let options = {
// // 	root: document.querySelector("#scrollArea"),
// // 	rootMargin: "0px",
// // 	threshold: 1.0
// // };

// // const checkIntersect = ([entry], observer) => {
// // 	if (entry.isIntersecting) {
// // 		async (entry, observer) => {
// // 			observer.unobserve(entry.target);
// // 			await fetchItems();
// // 			observer.observe(entry.target)
// // 		}
// // 	}
// // }

// const RecipeRecommend = () => {
// 	const classes = useStyles();

// 	const [recipe, setData] = useState([
// 		{ url: 'recipe', },
// 		{ url: 'rec', }
// 	])
// 	const viewport = useRef(null);
// 	const target = useRef(null)

// 	const dispatch = useDispatch();
// 	const [target, setTarget] = useState(null);
// 	const {
// 		isLoading,
// 		images,
// 		error
// 	} = useSelector(unsplashSelector.all);

// 	useInfinteScroll({
// 		target,
// 		onIntersect: ([{ isIntersecting }]) => {
// 			if (isIntersecting) {
// 				dispatch(unsplashAction.loadMore());
// 			}
// 		}
// 	});

// 	useEffect(() => {
// 		dispatch(unsplashAction.load());
// 	}, []);
// 	if (isLoading) {
// 	return 'loading';
// 	}
// 	if (error) {
// 	return 'error';
// 	}