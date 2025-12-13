import fs from 'fs';
import path from 'path';
import { Portfolio, Profile } from '../@types/portfolio.types';

const portfoliosDirectory = path.join(process.cwd(), 'data/portfolios');
const dataDirectory = path.join(process.cwd(), 'data');

export function getProfile(): Profile {
  const filePath = path.join(dataDirectory, 'profile.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAllPortfolios(): Portfolio[] {
  const fileNames = fs.readdirSync(portfoliosDirectory);
  const portfolios = fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(portfoliosDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Portfolio;
    });

  return portfolios;
}

export function getPortfolioById(id: string): Portfolio | null {
  const filePath = path.join(portfoliosDirectory, `${id}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAllPortfolioIds(): string[] {
  const fileNames = fs.readdirSync(portfoliosDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => fileName.replace(/\.json$/, ''));
}
