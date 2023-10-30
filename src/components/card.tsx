import { useId } from "react";

export default function Card({
  title,
  text,
  unused,
  used,
  steps,
}: {
  title: string;
  unused: string[];
  steps: string[];
  used: string[];
  text: string;
}) {
  return (
    <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-red-700 dark:text-gray-400">
        <ul>
          {unused.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      </p>
      <p className="font-normal text-green-700 dark:text-gray-400">
        <ul>
          {used.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      </p>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        <ul>
          {steps.map((name, i) => (
            <li key={i}>
              {i}. {name}
            </li>
          ))}
        </ul>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">{text}</p>
    </a>
  );
}
