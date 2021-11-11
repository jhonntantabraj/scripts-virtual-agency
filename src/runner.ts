import 'reflect-metadata';
import Container from 'typedi';
import { Generator } from './generator/generator';

const generator = Container.get(Generator);
generator.generateQueries(1);
