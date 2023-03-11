--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Homebrew)
-- Dumped by pg_dump version 15.1

-- Started on 2023-03-11 16:38:22 +08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 25741)
-- Name: AlgoBeez; Type: SCHEMA; Schema: -; Owner: shujun
--

CREATE SCHEMA "AlgoBeez";


ALTER SCHEMA "AlgoBeez" OWNER TO shujun;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 25203)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: chen_shujun
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO chen_shujun;

--
-- TOC entry 218 (class 1259 OID 25716)
-- Name: strategies; Type: TABLE; Schema: public; Owner: chen_shujun
--

CREATE TABLE public.strategies (
    id integer NOT NULL,
    symbol character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    capital double precision NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    "sSMA" integer NOT NULL,
    "lSMA" integer NOT NULL,
    qty_shares integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.strategies OWNER TO chen_shujun;

--
-- TOC entry 217 (class 1259 OID 25715)
-- Name: strategies_id_seq; Type: SEQUENCE; Schema: public; Owner: chen_shujun
--

CREATE SEQUENCE public.strategies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strategies_id_seq OWNER TO chen_shujun;

--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 217
-- Name: strategies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chen_shujun
--

ALTER SEQUENCE public.strategies_id_seq OWNED BY public.strategies.id;


--
-- TOC entry 216 (class 1259 OID 25623)
-- Name: users; Type: TABLE; Schema: public; Owner: chen_shujun
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    is_admin boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO chen_shujun;

--
-- TOC entry 220 (class 1259 OID 25725)
-- Name: users-strategies; Type: TABLE; Schema: public; Owner: chen_shujun
--

CREATE TABLE public."users-strategies" (
    id integer NOT NULL,
    user_id uuid NOT NULL,
    strategy_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."users-strategies" OWNER TO chen_shujun;

--
-- TOC entry 219 (class 1259 OID 25724)
-- Name: users-strategies_id_seq; Type: SEQUENCE; Schema: public; Owner: chen_shujun
--

CREATE SEQUENCE public."users-strategies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-strategies_id_seq" OWNER TO chen_shujun;

--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 219
-- Name: users-strategies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chen_shujun
--

ALTER SEQUENCE public."users-strategies_id_seq" OWNED BY public."users-strategies".id;


--
-- TOC entry 3475 (class 2604 OID 25719)
-- Name: strategies id; Type: DEFAULT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public.strategies ALTER COLUMN id SET DEFAULT nextval('public.strategies_id_seq'::regclass);


--
-- TOC entry 3476 (class 2604 OID 25728)
-- Name: users-strategies id; Type: DEFAULT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public."users-strategies" ALTER COLUMN id SET DEFAULT nextval('public."users-strategies_id_seq"'::regclass);


--
-- TOC entry 3478 (class 2606 OID 25207)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3484 (class 2606 OID 25723)
-- Name: strategies strategies_pkey; Type: CONSTRAINT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public.strategies
    ADD CONSTRAINT strategies_pkey PRIMARY KEY (id);


--
-- TOC entry 3486 (class 2606 OID 25730)
-- Name: users-strategies users-strategies_pkey; Type: CONSTRAINT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public."users-strategies"
    ADD CONSTRAINT "users-strategies_pkey" PRIMARY KEY (id);


--
-- TOC entry 3480 (class 2606 OID 25631)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3482 (class 2606 OID 25629)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3487 (class 2606 OID 25736)
-- Name: users-strategies users-strategies_strategy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public."users-strategies"
    ADD CONSTRAINT "users-strategies_strategy_id_fkey" FOREIGN KEY (strategy_id) REFERENCES public.strategies(id);


--
-- TOC entry 3488 (class 2606 OID 25731)
-- Name: users-strategies users-strategies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chen_shujun
--

ALTER TABLE ONLY public."users-strategies"
    ADD CONSTRAINT "users-strategies_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2023-03-11 16:38:22 +08

--
-- PostgreSQL database dump complete
--

