import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Button from '../UI/Button';
import { createReview } from '../../services/reviewService';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const ReviewForm = ({ carId, onReviewAdded }) => {
    const { currentUser, userProfile } = useAuth();
    const toast = useToast();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        setLoading(true);
        try {
            await createReview({
                carId,
                userId: currentUser.uid,
                userName: userProfile?.displayName || currentUser.email,
                rating,
                comment
            });

            toast.success('Review submitted successfully');
            setRating(0);
            setComment('');
            onReviewAdded?.();
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Please login to leave a review.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Write a Review</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                className={`w-6 h-6 ${star <= (hoverRating || rating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-200'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    rows="4"
                    placeholder="Share your experience..."
                    required
                />
            </div>

            <Button type="submit" isLoading={loading}>
                Submit Review
            </Button>
        </form>
    );
};

export default ReviewForm;
