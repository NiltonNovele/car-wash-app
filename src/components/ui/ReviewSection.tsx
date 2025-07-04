import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddReviwMutation,
  useGetAllReviwsQuery,
} from "../../redux/features/reviw/ReviwsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type TReview = {
  _id?: number;
  rating: number;
  feedback: string;
};

const ReviewSection = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [reviews, setReviews] = useState<TReview[]>([]);
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const [addReviw] = useAddReviwMutation();
  const { data } = useGetAllReviwsQuery(undefined);

  useEffect(() => {
    if (data && data.data && Array.isArray(data.data)) {
      const formattedReviews: TReview[] = data.data.map((review: any) => ({
        _id: review?._id,
        feedback: review?.feedback || "",
        rating: Number(review?.rating) || 0,
      }));
      setReviews(formattedReviews);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Não autorizado",
        text: "Por favor inicie sessão para deixar uma avaliação.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const newReview: TReview = { rating, feedback };

    try {
      await addReviw(newReview).unwrap();
      setReviews([newReview, ...reviews]);
      setRating(0);
      setFeedback("");
      Swal.fire({
        title: "Obrigado!",
        text: "Agradecemos o seu feedback!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao enviar a sua avaliação.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
        reviews.length
      : 0;

  return (
    <div>
      <section className="relative bg-white bg-opacity-90 rounded-lg p-6 max-w-3xl mx-auto shadow-md z-10">
        {/* Sobreposição com botão de login */}
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20 mt-5 rounded-md">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
              onClick={() => navigate("/login")}
            >
              Iniciar Sessão para Avaliar
            </button>
          </div>
        )}

        {/* Campos para avaliação */}
        {isAuthenticated && (
          <div className="relative flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Deixe o seu feedback
            </h2>
            <StarRating rating={rating} setRating={setRating} />
            <textarea
              className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Escreva o seu comentário..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
        )}

        {/* Avaliação geral */}
        <div className="mt-8 flex flex-col items-center lg:flex-row lg:justify-between lg:items-start">
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold mb-2">Avaliação Geral</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <StarRating
                rating={Math.round(averageRating)}
                setRating={() => {}}
              />
            </div>
          </div>

          {/* Últimas 2 avaliações */}
          <div className="lg:w-96 w-full">
            <h3 className="text-xl font-semibold mb-2 text-center lg:text-left">
              Avaliações Recentes
            </h3>
            {reviews.slice(0, 2).map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded-lg mb-2 bg-gray-50"
              >
                <StarRating rating={review.rating} setRating={() => {}} />
                <p className="mt-2">{review.feedback}</p>
              </div>
            ))}
            <button
              onClick={() => navigate("/reviews")}
              className="mt-4 py-2 px-6 bg-gray-500 text-white rounded-lg hover:text-black hover:bg-green-500 transition duration-300 w-full lg:w-auto"
            >
              Ver Todas as Avaliações
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewSection;
