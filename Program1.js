// emi-calculator.js

/**
 * EMI Calculator module for calculating loan EMIs
 * @module emi-calculator
 */

/**
 * Calculates the Equated Monthly Installment (EMI) for a loan
 * @param {number} principal - Total loan amount (before down payment)
 * @param {number} downPayment - Down payment amount
 * @param {number} interestRate - Annual interest rate (in percentage)
 * @param {number} durationInMonths - Loan duration in months
 * @returns {Object} Object containing EMI details
 */
function calculateEMI(principal, downPayment = 0, interestRate, durationInMonths) {
    // Input validation
    if (typeof principal !== 'number' || principal <= 0) {
      throw new Error('Principal must be a positive number');
    }
    
    if (typeof downPayment !== 'number' || downPayment < 0) {
      throw new Error('Down payment must be a non-negative number');
    }
    
    if (typeof interestRate !== 'number' || interestRate < 0) {
      throw new Error('Interest rate must be a non-negative number');
    }
    
    if (!Number.isInteger(durationInMonths) || durationInMonths <= 0) {
      throw new Error('Duration must be a positive integer');
    }
  
    // Calculate loan amount after down payment
    const loanAmount = principal - downPayment;
    
    if (loanAmount <= 0) {
      throw new Error('Loan amount after down payment must be positive');
    }
    
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = interestRate / 12 / 100;
    
    let emiAmount;
    
    // If interest rate is 0, simple division
    if (interestRate === 0) {
      emiAmount = loanAmount / durationInMonths;
    } else {
      // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
      // Where P = Principal, R = Monthly interest rate, N = Number of monthly installments
      const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, durationInMonths);
      const denominator = Math.pow(1 + monthlyInterestRate, durationInMonths) - 1;
      emiAmount = numerator / denominator;
    }
    
    // Calculate total amount to be paid
    const totalAmount = emiAmount * durationInMonths;
    
    // Calculate total interest to be paid
    const totalInterest = totalAmount - loanAmount;
    
    return {
      principal,
      downPayment,
      loanAmount,
      interestRate,
      durationInMonths,
      emiAmount,
      totalAmount,
      totalInterest
    };
  }
  
  /**
   * Generates an amortization schedule for the loan
   * @param {number} principal - Total loan amount (before down payment)
   * @param {number} downPayment - Down payment amount
   * @param {number} interestRate - Annual interest rate (in percentage)
   * @param {number} durationInMonths - Loan duration in months
   * @returns {Array} Array of monthly payment details
   */
  function generateAmortizationSchedule(principal, downPayment = 0, interestRate, durationInMonths) {
    const emiDetails = calculateEMI(principal, downPayment, interestRate, durationInMonths);
    const monthlyInterestRate = interestRate / 12 / 100;
    const schedule = [];
    
    let remainingBalance = emiDetails.loanAmount;
    
    for (let month = 1; month <= durationInMonths; month++) {
      const interestForMonth = remainingBalance * monthlyInterestRate;
      const principalForMonth = emiDetails.emiAmount - interestForMonth;
      remainingBalance -= principalForMonth;
      
      schedule.push({
        month,
        emiAmount: emiDetails.emiAmount,
        principalPaid: principalForMonth,
        interestPaid: interestForMonth,
        remainingBalance: Math.max(0, remainingBalance) // Ensure balance doesn't go negative due to rounding
      });
    }
    
    return schedule;
  }
  
  module.exports = {
    calculateEMI,
    generateAmortizationSchedule
  };