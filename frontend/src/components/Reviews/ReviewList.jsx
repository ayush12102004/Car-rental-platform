import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { getCarReviews } from '../../services/reviewService';

const ReviewList = ({ carId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, [carId]);

    const fetchReviews = async () => {
        try {
            const data = await getCarReviews(carId);
            setReviews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading reviews...</div>;

    if (reviews.length === 0) {
        return <div className="text-gray-500 py-4">No reviews yet. Be the first to review!</div>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="font-bold">{review.userName || 'User'}</h4>
                            <p className="text-xs text-gray-400">
                                {review.createdAt ? format(new Date(review.createdAt), 'MMM dd, yyyy') : ''}
                            </p>
                        </div>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
