import React, { useState } from 'react';
import { DollarSign, CreditCard, Calendar, User, Shield, ChevronDown, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Mock data for demonstration
const mockTransactions = [
  {
    id: 1,
    description: "Website Subscription",
    amount: 29.99,
    date: "2023-04-15",
    status: "completed",
    paymentMethod: "Credit Card (**** 4832)",
  },
  {
    id: 2,
    description: "Premium Content Access",
    amount: 49.99,
    date: "2023-04-10",
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    description: "Monthly Donation",
    amount: 15.00,
    date: "2023-04-05",
    status: "completed",
    paymentMethod: "Credit Card (**** 7291)",
  },
  {
    id: 4,
    description: "Service Fee",
    amount: 9.99,
    date: "2023-04-01",
    status: "pending",
    paymentMethod: "Bank Transfer",
  },
];

const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: 9.99,
    features: [
      "10 projects",
      "5GB storage",
      "Basic support",
      "24/7 access",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Professional",
    price: 29.99,
    features: [
      "Unlimited projects",
      "50GB storage",
      "Priority support",
      "24/7 access",
      "Advanced analytics",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: 99.99,
    features: [
      "Unlimited everything",
      "500GB storage",
      "Dedicated support",
      "24/7 access",
      "Advanced analytics",
      "Team collaboration",
      "Custom integrations",
      "API access",
    ],
    popular: false,
  },
];

function PaymentSystem() {
  const [activeTab, setActiveTab] = useState('checkout');
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[1]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove any non-digit characters
    value = value.replace(/\D/g, '');
    
    // Only allow up to 4 digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    // Format as MM/YY
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    setExpiryDate(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Reset form
      setCardNumber('');
      setCardName('');
      setExpiryDate('');
      setCvv('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Payment System" 
        icon={<DollarSign className="h-8 w-8 text-emerald-500" />}
        description="Process payments and manage transactions."
      />

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('checkout')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'checkout'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Make a Payment
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'history'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transaction History
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'pricing'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pricing Plans
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'checkout' && (
            <div className="max-w-3xl mx-auto">
              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">Payment successful!</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Thank you for your payment. Your transaction has been completed successfully.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="card-number"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="pl-10 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="card-name"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="John Doe"
                              className="pl-10 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="expiry-date"
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                placeholder="MM/YY"
                                className="pl-10 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Shield className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={handleCvvChange}
                                placeholder="123"
                                className="pl-10 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>Pay {formatAmount(selectedPlan.price)}</>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or pay with</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-3">
                        <button className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          PayPal
                        </button>
                        <button className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          Apple Pay
                        </button>
                        <button className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          Google Pay
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{selectedPlan.name} Plan</h3>
                          <p className="text-sm text-gray-500">Monthly subscription</p>
                        </div>
                        <div className="text-base font-medium text-gray-900">
                          {formatAmount(selectedPlan.price)}
                        </div>
                      </div>

                      <div className="py-4 space-y-3">
                        {selectedPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <dt className="text-sm text-gray-600">Subtotal</dt>
                          <dd className="text-sm font-medium text-gray-900">{formatAmount(selectedPlan.price)}</dd>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <dt className="text-sm text-gray-600">Tax</dt>
                          <dd className="text-sm font-medium text-gray-900">{formatAmount(selectedPlan.price * 0.1)}</dd>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                          <dt className="text-base font-medium text-gray-900">Order total</dt>
                          <dd className="text-base font-medium text-gray-900">{formatAmount(selectedPlan.price * 1.1)}</dd>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h2>
              
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payment Method
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{formatAmount(transaction.amount)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  transaction.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {transaction.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {transaction.paymentMethod}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Choose a Plan</h2>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {pricingPlans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`rounded-lg shadow-sm overflow-hidden border ${
                      plan.id === selectedPlan.id 
                        ? 'border-emerald-500 ring-2 ring-emerald-500' 
                        : 'border-gray-200'
                    } transition-all duration-200`}
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                      
                      {plan.popular && (
                        <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Popular
                        </p>
                      )}
                      
                      <p className="mt-4">
                        <span className="text-3xl font-extrabold text-gray-900">${plan.price}</span>
                        <span className="text-base font-medium text-gray-500">/mo</span>
                      </p>
                      
                      <div className="mt-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0">
                                <Check className="h-5 w-5 text-emerald-500" />
                              </div>
                              <p className="ml-2 text-sm text-gray-500">{feature}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="px-6 pt-4 pb-6 bg-gray-50">
                      <button
                        onClick={() => setSelectedPlan(plan)}
                        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                          plan.id === selectedPlan.id
                            ? 'text-white bg-emerald-600 hover:bg-emerald-700'
                            : 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                      >
                        {plan.id === selectedPlan.id ? 'Selected' : 'Select Plan'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentSystem;