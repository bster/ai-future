export const TERMS = [
  // A
  { letter: "A", term: "AGI (Artificial General Intelligence)", definition: "AI that can perform any intellectual task a human can, not just the narrow tasks it was trained for. No such system currently exists. The question of whether it is achievable, and when, is the central dispute in the AI debate." },
  { letter: "A", term: "AI Agent", definition: "An AI system that takes actions in the world — browsing the web, writing code, sending emails — rather than just generating text in response to a prompt. Agents combine a language model with memory, tools, and the ability to plan multi-step tasks." },
  { letter: "A", term: "Alignment", definition: "The challenge of building AI systems that reliably pursue the goals humans actually intend, rather than technically correct but unintended interpretations of those goals. Alignment research addresses everything from filtering harmful outputs to preventing an AI from optimizing for the wrong objective at scale." },
  { letter: "A", term: "Attention mechanism", definition: "The mathematical operation at the core of transformer models. When processing a token, attention allows the model to weigh how relevant every other token in the input is to understanding that one — letting models capture long-range relationships across a passage of text." },

  // B
  { letter: "B", term: "Benchmark", definition: "A standardized test used to measure an AI model's capabilities: how well it answers questions, writes code, reasons through problems, or translates text. Benchmarks are widely used to compare models, but scores can be misleading if models have been trained on benchmark data." },

  // C
  { letter: "C", term: "Chain-of-thought prompting", definition: "A technique where you ask an AI to show its reasoning step by step before giving a final answer. Consistently improves performance on complex tasks — the model \"thinks out loud\" rather than pattern-matching to an answer directly." },
  { letter: "C", term: "Context window", definition: "The maximum amount of text an AI model can process in a single interaction. Everything within the window — your prompt, conversation history, any documents provided — is what the model can see and reason about. Larger context windows let models handle longer documents and conversations." },

  // D
  { letter: "D", term: "Deep learning", definition: "A type of machine learning that uses neural networks with many layers to recognize patterns in data. The \"deep\" refers to the number of layers. Deep learning is the foundation of modern AI systems including image recognition, language models, and speech synthesis." },
  { letter: "D", term: "Diffusion model", definition: "A type of generative AI model used primarily for images, audio, and video. Diffusion models learn by studying how data degrades into noise and then reverse-engineer that process to generate new content. Stable Diffusion and Midjourney use this approach." },

  // E
  { letter: "E", term: "Embeddings", definition: "A way of converting words, sentences, or other data into lists of numbers (vectors) that capture meaning. Words with similar meanings end up near each other in this space. Embeddings are the foundation of semantic search, recommendation systems, and retrieval-augmented generation." },
  { letter: "E", term: "Emergent behavior", definition: "Capabilities that appear in large AI models that were not explicitly trained for and were not predicted from smaller versions of the same model. The appearance of these abilities at scale is one of the most debated phenomena in current AI research." },

  // F
  { letter: "F", term: "Few-shot learning", definition: "The ability to perform a task after seeing only a handful of examples provided in the prompt. In contrast, zero-shot learning is doing the task with no examples at all. Modern LLMs are capable of both." },
  { letter: "F", term: "Fine-tuning", definition: "Adapting a pretrained model to a specific task or domain by training it further on a smaller, targeted dataset. Fine-tuning requires far less compute than training from scratch and allows general-purpose models to be specialized for particular uses." },
  { letter: "F", term: "Foundation model", definition: "A large model trained on vast general-purpose data that serves as the base for many downstream applications. GPT-4, Claude, and Gemini are foundation models — they can be prompted, fine-tuned, or adapted without being retrained from scratch." },

  // G
  { letter: "G", term: "Generative AI", definition: "AI systems that produce new content — text, images, code, audio, video — rather than just classifying or predicting. Generative AI is trained to produce outputs that resemble patterns in its training data." },
  { letter: "G", term: "Grounding", definition: "Connecting a model's outputs to specific, verifiable sources of information rather than relying solely on what it learned during training. Grounding reduces hallucinations and allows models to reason about up-to-date or private data they were never trained on." },
  { letter: "G", term: "Guardrails", definition: "Rules, filters, and constraints built into AI systems to prevent harmful, false, or off-topic outputs. Guardrails can be built into the model itself through training, or applied as a layer on top through system prompts, output filters, or moderation pipelines." },

  // H
  { letter: "H", term: "Hallucination", definition: "When an AI model confidently generates information that is false, fabricated, or unsupported. Hallucinations arise because language models predict plausible text rather than verify facts. They are a fundamental property of current architectures, not merely a bug." },

  // I
  { letter: "I", term: "Inference", definition: "Running a trained AI model to generate outputs. Inference is distinct from training: training teaches the model, inference uses it. The computational cost of a single inference is far lower than training, but adds up enormously at scale across millions of queries." },
  { letter: "I", term: "Interpretability", definition: "The study of understanding what is happening inside an AI model — which parts are responsible for which outputs, and why the model makes the predictions it does. Interpretability is currently limited: even the researchers who build these systems cannot fully explain how they work." },

  // L
  { letter: "L", term: "Large Language Model (LLM)", definition: "A type of AI model trained on enormous amounts of text to predict and generate language. LLMs power most modern AI assistants — ChatGPT, Claude, Gemini. \"Large\" refers to both the size of the training data and the number of parameters in the model." },

  // M
  { letter: "M", term: "Multimodal", definition: "A model or system that can process and generate multiple types of data — text, images, audio, video — rather than just one. Modern multimodal models can answer questions about images, generate images from text descriptions, or transcribe and summarize audio." },

  // N
  { letter: "N", term: "Neural network", definition: "A computing architecture consisting of layers of interconnected nodes that transform inputs into outputs through learned numerical weights. Every major AI system today is built on neural networks. \"Deep\" learning refers to networks with many such layers." },

  // O
  { letter: "O", term: "Overfitting", definition: "When a model memorizes its training data rather than learning generalizable patterns, making it perform well on examples it has seen but poorly on new data. Avoiding overfitting is a central challenge in building reliable AI systems." },

  // P
  { letter: "P", term: "Parameters", definition: "The numerical weights inside a neural network that are learned during training and determine how the model processes inputs. Model size is described in terms of parameter count — GPT-3 has 175 billion. More parameters generally allow more nuanced representations but require more compute to train and run." },
  { letter: "P", term: "Prompt", definition: "The input you give to an AI model — a question, instruction, context, or some combination. The quality and structure of a prompt significantly affects the quality of the model's output. Prompt engineering is the practice of crafting inputs to reliably get better results." },
  { letter: "P", term: "Prompt injection", definition: "A type of attack where malicious instructions are hidden inside content the model is asked to process — a document, a web page, a user message — in order to hijack the model's behavior. A key security concern for any AI system that processes untrusted input." },

  // R
  { letter: "R", term: "RAG (Retrieval-Augmented Generation)", definition: "A technique that connects a language model to an external knowledge base at inference time. Before generating a response, the model retrieves relevant documents and uses them as context. RAG improves accuracy and lets models work with up-to-date or private information without retraining." },
  { letter: "R", term: "Recursive self-improvement", definition: "The hypothetical process by which an AI system improves its own design, producing a more capable system that is in turn better at further self-improvement. Each iteration raises the capability ceiling faster than the last, potentially compressing decades of gradual progress into a very short period. Whether this is achievable is unknown; that it would be dangerous if alignment is unsolved is the central premise of the doomer argument." },
  { letter: "R", term: "RLHF (Reinforcement Learning from Human Feedback)", definition: "A training technique in which humans compare model outputs and rate which is better, and that feedback is used to further train the model to produce responses humans prefer. RLHF is how ChatGPT and most major assistants are tuned to be helpful and to avoid harmful outputs." },

  // S
  { letter: "S", term: "Singularity", definition: "The hypothetical point at which AI surpasses human intelligence and triggers recursive self-improvement so rapid that human civilization is transformed in ways impossible to predict from before it. The term comes from mathematics, where a singularity is a point at which normal rules break down. Ray Kurzweil popularized it as an AI concept; critics argue it is more metaphor than forecast, and that the analogy to a mathematical singularity flatters the prediction." },
  { letter: "S", term: "Stochastic", definition: "Involving randomness. LLMs generate text by probabilistically sampling from a distribution of possible next tokens rather than always selecting the most likely one. This is why the same prompt can produce different outputs — and why lowering the temperature setting makes models more predictable." },
  { letter: "S", term: "Superintelligence", definition: "A hypothetical AI system that surpasses human-level intelligence across all cognitive domains. Superintelligence does not currently exist. Whether it is achievable, how soon, and what it would mean are among the most contested questions in AI research." },
  { letter: "S", term: "System prompt", definition: "Instructions given to an AI model before the user's input, typically hidden from the user, that shape how the model behaves throughout the interaction. System prompts define the model's persona, set restrictions, and establish context." },

  // T
  { letter: "T", term: "Temperature", definition: "A setting that controls how randomly an AI model samples from the range of possible outputs. High temperature makes outputs more varied and creative; low temperature makes them more focused and predictable. One of the simplest ways to tune model behavior without retraining." },
  { letter: "T", term: "Token", definition: "The basic unit a language model processes — typically a word fragment of a few characters, though it can be a whole word or punctuation mark. Models don't read word by word; they read token by token. Token count determines cost and whether an interaction fits within the context window." },
  { letter: "T", term: "Training", definition: "The process of teaching a neural network by showing it large amounts of data and adjusting its internal weights to minimize prediction error. Training is computationally intensive and happens before deployment; inference is the everyday use of the trained model." },
  { letter: "T", term: "Transformer", definition: "The neural network architecture introduced in 2017 that underlies virtually all modern large language models. Transformers process entire sequences of tokens simultaneously using the attention mechanism, allowing them to model long-range relationships in text. GPT, Claude, Gemini, and most frontier models are transformers." },

  // W
  { letter: "W", term: "Weights", definition: "The numerical values inside a neural network that are learned during training and determine how the model processes inputs. When someone refers to downloading or sharing a model, they are typically referring to its weights — everything the model has learned, encoded numerically." },

  // Z
  { letter: "Z", term: "Zero-shot learning", definition: "The ability to perform a task with no examples — just a description or instruction. Zero-shot capability is one of the most striking properties of large language models: they can often follow instructions for tasks they were never explicitly trained on." },
];
